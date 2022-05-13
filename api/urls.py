from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
# from venture import views


router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'groupusers', GroupUsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('signup/', signup),
    path('email-exists/', emailExists),
    path('password-reset/', passwordResetConfirm),
    path('user-groups/', user_groups),
    path('group-todos/<int:groupid>/', todo),
    path('group-messages/<int:groupid>/', message),
]
