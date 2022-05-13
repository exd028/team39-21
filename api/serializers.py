from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import *


class UserSerializer(serializers.ModelSerializer):  # HyperlinkedModelSerializer
    class Meta:
        model = User
        # use all fields from User model
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'url'

        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = [
            'id',
            'name',
            'description',
            'url',

        ]
        read_only_fields = ['id']


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id',  'title', 'description', 'completed', 'group', 'url']

    def to_representation(self, instance):
        self.fields['group'] = GroupSerializer(read_only=True)
        return super(TodoSerializer, self).to_representation(instance)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['url', 'timestamp', ]

    def to_representation(self, instance):
        self.fields['user'] = UserSerializer(read_only=True)
        self.fields['group'] = GroupSerializer(read_only=True)
        return super(MessageSerializer, self).to_representation(instance)


class GroupUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupUsers
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['group'] = GroupSerializer(read_only=True)
        self.fields['user'] = UserSerializer(read_only=True)
        return super(GroupUsersSerializer, self).to_representation(instance)
