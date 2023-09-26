from rest_framework import permissions
from utils.dict_format import DictFormater
from authentication.models import User, AccessTokens
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import APIException
from rest_framework import status
from utils.response_helper import response_helper
from department.models import Department


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
        print(user_obj.exists())
        if user_obj.exists():
            return True
        
        raise self.NotAuthenticated()
    