from rest_framework import serializers
from authentication.models import User, AccessTokens
from rest_framework.exceptions import ValidationError

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessTokens
        fields = ["token"]


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user_serializer = CustomerSerializer(validated_data.get('customer'))
        user_serializer.save()
        return User.objects.create(**validated_data)
    
    class Meta:
        model = User
        exclude = ['password']


class RegisterSerializers(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, max_length=12, min_length=6)
    class Meta:
        model = User
        fields = [
            "first_name",
            "email",
            "username",
            "password",
            "confirm_password"
        ]

    def validate(self, data):
        """This validate method used to validate the password, 
        the password should match the password."""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password":"Passwords do not match."})
        return data
    
    def create(self, validated_data):
        # Create and return a new instance of MyModel
        instance = User(**validated_data)
        instance.save()
        return instance


class LoginCredencialsSerializers(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


