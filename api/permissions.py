from rest_framework import permissions
from django.contrib.auth.models import User

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it
    """

    def has_object_permission(self, request, view, obj):
        
        #Read perms are allowed to any request,
        #so we always allow GET, HEAD or OPTIONS requests/
        if request.method in permissions.SAFE_METHODS:
            return True

        #Write permissions are only allowed to the owner of the object       
        return obj.user == request.user

class IOROForUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        
        #Read perms are allowed to any request,
        #so we always allow GET, HEAD or OPTIONS requests/
        if request.method in permissions.SAFE_METHODS:
            return True

        #Write permissions are only allowed to the owner of the object       
        return obj.id == request.user.id