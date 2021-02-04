from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username', 'email',
            'first_name', 'last_name',
            'age', 'sex', 'phone',
            'crno', 'bedno', 'weight',
            'rapid_insulin', 'long_acting',
            'is_extreme',
            'is_superuser',
        )


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username', 'email', 'password',
            'first_name', 'last_name',
            'age', 'sex', 'phone',
            'crno', 'bedno', 'weight',
            'rapid_insulin', 'long_acting',
            'is_extreme',
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validate_data):
        user = get_user_model().objects.create_user(
            validate_data['username'], validate_data['email'], validate_data['password'])
        user.first_name = validate_data['first_name']
        user.last_name = validate_data['last_name']
        user.age = validate_data['age']
        user.sex = validate_data['sex']
        user.phone = validate_data['phone']
        user.crno = validate_data['crno']
        user.bedno = validate_data['bedno']
        user.weight = validate_data['weight']
        user.rapid_insulin = validate_data['rapid_insulin']
        user.long_acting = validate_data['long_acting']
        user.is_extreme = validate_data['is_extreme']
        user.save()
        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials...")
