from rest_framework import permissions
from utils.dict_format import DictFormater
from authentication.models import User, AccessTokens
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import APIException
from rest_framework import status
from utils.response_helper import response_helper
from department.models import Department
from typing import Iterator, Union, TypeVar, Generic
from django.db.models import QuerySet
T = TypeVar("T")

class TokenAuthentication(permissions.BasePermission):
    """This custome permission class checked the token authorised and raise 
    exeption if not provided or not authorized."""

    class NeedToken(APIException):
        """This Exception class is used to throw a custom message when header doesn't contains 
        the token parameter"""
        
        status_code = status.HTTP_403_FORBIDDEN
        default_detail = response_helper(
            status=status.HTTP_403_FORBIDDEN,
            message="Please provide authentication token."
        )
        default_code = 'Authentication_header_not_found'


    class NotAuthenticated(APIException):
        """This Exception class is used to throw a custom message when your 
        doesn't veriyied with the provided token."""
        
        status_code = status.HTTP_401_UNAUTHORIZED
        default_detail = response_helper(
            status=status.HTTP_401_UNAUTHORIZED,
            message="Not authenticated, Probably your token expired or not valid"
        )
        default_code = 'not_authenticated'
            
    def has_permission(self, request, views):
        token:str = request.META.get("HTTP_AUTHENTICATION", False)
        if not token:
            raise self.NeedToken()
        
        user_obj = AccessTokens.objects.filter(token=token.split("Bearer ")[1])
        if user_obj.exists():
            return True
        raise self.NotAuthenticated()
    
    @staticmethod
    def user_info(token:str) -> QuerySet[User]:
        """This method validate the token and checks associated 
        with provided token user is super user or child user and also checks the is user
        has parent user

        :Params
        token: Authentication token

        :Returns
        this method  returns the two values e.g. ( parent_user, current_user ) 
        
        """
        
        is_user = AccessTokens.objects.filter(token=token.split("Bearer ")[1])
        if not is_user.exists():
            return False, False
        
        user = is_user.first().user
        
        return user.parent_user, user
        