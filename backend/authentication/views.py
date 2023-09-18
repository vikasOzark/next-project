from authentication.serialilzers import UserSerializer, TokenSerializer, LoginCredencialsSerializers, RegisterSerializers
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, decorators
from authentication.models import User, AccessTokens
from rest_framework.viewsets import ViewSet
import jwt
from django.contrib.auth import authenticate
from utils.response_helper import response_helper 

   
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
                    response_helper(
                        message="Successfully registered, Please login.",
                        success=True,
                        status = status.HTTP_200_OK
                    ), status=status.HTTP_200_OK)
            else:
                return Response(
                    response_helper(
                        message="Couldn't complete the request.",
                        data=singup.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    ), status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(
                response_helper(
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
                    response_helper(
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
                response_helper(
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
                response_helper(
                    message = "Couln't complete the request",
                    data= serialize.errors,
                    status=status.HTTP_400_BAD_REQUEST
                ), 
                status=status.HTTP_400_BAD_REQUEST,
                exception=True
            )