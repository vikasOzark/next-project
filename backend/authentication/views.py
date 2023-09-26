from authentication.serialilzers import (
        UserSerializer, 
        TokenSerializer, 
        LoginCredencialsSerializers, 
        RegisterSerializers,
        PermissionSerializer
    )
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, decorators
from authentication.models import User, AccessTokens
from rest_framework.viewsets import ViewSet
import jwt
from django.contrib.auth import authenticate
from utils import response_helper, permission_prifix
from django.http import JsonResponse
from django.apps import apps, AppConfig
import json
from utils.dict_format import DictFormater
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from pydoc import locate
from django.db import models
   
class AuthenticationViewset(ViewSet):

    @decorators.action(methods=["POST"], url_name="singup", url_path="singup", detail=False)
    def singup(self, request:Request) -> Response:
        """This method is used allow to register user"""
        
        try:
            singup = RegisterSerializers(data=request.data)
            if singup.is_valid():

                instance = User(
                    first_name = singup.validated_data.get("first_name"),
                    last_name = singup.validated_data.get("last_name"),
                    phone_number = singup.validated_data.get("phone"),
                    email = singup.validated_data.get("email"),
                    username = singup.validated_data.get("username"),
                )
                instance.set_password(
                    singup.validated_data.get("password")
                )
                instance.save()
                return Response(
                    response_helper.response_helper(
                        message="Successfully registered, Please login.",
                        success=True,
                        status = status.HTTP_200_OK
                    ), status=status.HTTP_200_OK)
            else:
                return Response(
                    response_helper.response_helper(
                        message="Couldn't complete the request.",
                        data=singup.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    ), status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(
                response_helper.response_helper(
                    message="Somethin went wrong, Internal server error.",
                    status=status.HTTP_400_BAD_REQUEST
                ), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    @decorators.action(methods=["POST"], url_name="login", url_path="login", detail=False)
    def login(self, request:Request) -> Response:
        """
        This action method is responsible for allow user to authenticate and 
        return JWT auth token.

        Returns:
            Return the Response back to the client
        """
        serialize = LoginCredencialsSerializers(data=request.data)
        if serialize.is_valid():
            user = authenticate(
                request=request,
                username=serialize.validated_data.get("email"),
                password=serialize.validated_data.get("password")
            )

            if not user:
                return Response(
                    response_helper.response_helper(
                        message="Email or Password is not correct!",
                        status=status.HTTP_404_NOT_FOUND
                    ), status=status.HTTP_404_NOT_FOUND) 
            
            user = UserSerializer(user).data
            encoded = jwt.encode({**user}, "secret", algorithm="HS256")
            create_token = AccessTokens(
                user=User.objects.get(pk=user.get("id")),
                token=encoded
            )
            create_token.save()
            token = TokenSerializer(create_token).data
            return Response(
                response_helper.response_helper(
                    message="successfully authenticated!",
                    success=True,
                    data={
                        "user_data" : user,
                        "token" : token.get("token")
                    }, status=status.HTTP_200_OK
                ), status=status.HTTP_200_OK
            ) 
        else:
            return Response(
                response_helper.response_helper(
                    message = "Couln't complete the request",
                    data= serialize.errors,
                    status=status.HTTP_400_BAD_REQUEST
                ), 
                status=status.HTTP_400_BAD_REQUEST,
                exception=True
            )
        
class PermissionHandlerViewset(ViewSet):
    RESTRICTED_MODELS = [
        "LogEntry",
        "Permission",
        "Group",
        "ContentType",
        "Session",
    ]

    def permission_prifix_formater(self):
        prifixes = permission_prifix.PermissionPrifix
        return {prifix: prifixes[prifix].value for prifix in prifixes._member_names_}
    
    def get_valid_models(self):
        models_list = [ model for model in apps.get_models()]
        return [
            {"model_name": model.__name__, "module": model.__module__} 
            for model in models_list 
            if model.__name__ not in self.RESTRICTED_MODELS
        ]
    
    @decorators.action(url_name="list_permissions_options", url_path="list", methods=["GET"], detail=False)
    def get_permissions_prifixes(self, request:Request):
        module_name = request.query_params.get("mon", False)
        model_name = request.query_params.get("mn", False)

        if all([model_name, module_name]):
            model_locate = locate(f"{module_name}.{model_name}")
            content_type = ContentType.objects.get_for_model(model_locate)
            permission = Permission.objects.filter(content_type=content_type)
            permission_options = json.dumps(list(permission.values("name", "codename")))

            return JsonResponse(
                response_helper.response_helper(
                    status=status.HTTP_200_OK,
                    message="Successfully get the permissions options.",
                    success=True,
                    data= {
                        "model_name" : model_name,
                        "permission_options" : permission_options
                    }
                ), 
                status = status.HTTP_200_OK
            )

        return JsonResponse(
            response_helper.response_helper(
                status=status.HTTP_200_OK,
                message="Successfully get the permissions.",
                success=True,
                data= {
                    "db_model" : self.get_valid_models(),
                    "permissions" : self.permission_prifix_formater()
                }
            ), 
            status = status.HTTP_200_OK
        )
    
    @decorators.action(methods=["POST"], url_name="set_permission", url_path="set", detail=False)
    def assign_permission(self, request):
        serialized_data = PermissionSerializer(data=request.data)
        if serialized_data.is_valid():
            
            
            User.objects.all()[0].has_perm("add_department")
            
            return JsonResponse(
                response_helper.response_helper(
                    status=status.HTTP_200_OK,
                    message="YOOOOOOOOOOOOOOOOO",
                    success=True
                )
            )
        else:
            return JsonResponse(
                response_helper.response_helper(
                    status=status.HTTP_400_BAD_REQUEST,
                    message="YOOOOOOOOOOOOOOOOO",
                    success=False,
                    data=serialized_data.errors
                ),
                status = status.HTTP_400_BAD_REQUEST
            )
        
        request_body = DictFormater(request.data)
        

        return JsonResponse({})
