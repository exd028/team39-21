from django.contrib.auth.models import User  # import django's user model
from django.contrib.auth.hashers import make_password

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from api.models import *  # import all models created
from api.serializers import *  # import all serializers created
from uuid import uuid4


@api_view(['POST'])
def test2(request):
    print(request.session.get('TEST'))
    print(request.data)
    return Response()


@api_view(['POST'])
def test(request):
    request.session['TEST'] = "HI"
    print(request.data)
    return Response()


def nameOrNull(dict, key):
    if key in dict.keys():
        return dict[key]
    else:
        return ""

#password-reset/
@api_view(['POST'])
def passwordResetConfirm(request):
    data = request.data
    token = data['token']
    originalToken = getToken()
    password = data['password']
    newPass = make_password(password)
    if(token == originalToken):
        User.objects.filter(
            email=data['email']).update(password=newPass)
        return Response({"SUCCESS": "password has been updated"})

    return Response({"ERROR": "token incorrect"})

#email-exists/
@api_view(['POST'])
def emailExists(request):
    data = request.data
    #token generation
    global originalToken
    originalToken = str(uuid4())
    print(originalToken)
    global getToken
    def getToken():
        global originalToken
        token = originalToken
        originalToken = str(uuid4())
        return token
    if User.objects.filter(email=data['email']).exists():
        return Response(data={"token": originalToken})
    else:
        return Response(data={"ERROR": "email address does not exist"})

#signup/
@api_view(['POST'])
def signup(request):
    data = request.data
    if User.objects.filter(username=data['username']).exists():
        return Response(data={"ERROR": "user already exists", "username": data['username']})
    else:
        User.objects.create_user(
            username=data['username'],
            password=data['password'],
            email=nameOrNull(data, 'email'),
            first_name=nameOrNull(data, 'first_name'),
            last_name=nameOrNull(data, 'last_name')
        )

        return Response(data={"SUCCESS": "user created"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_groups(request):
    if not request.user.is_authenticated:
        return Response(status=401)
    user = request.user
    # print(user)
    groups = []

    for gc in GroupUsers.objects.filter(user=user):
        group = Group.objects.get(pk=gc.group.id)

        groups.append(
            {"id": gc.group.id,
                "name": gc.group.name
             })

    return Response({
        'username': user.username,
        'id': user.id,
        'groups': groups
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def todo(request, groupid=0):
    todos = []
    for todo in Group.objects.get(pk=groupid).todo_set.all():
        todos.append({
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "completed": todo.completed
        })
    return Response({
        "group id": groupid,
        "todos": todos
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def message(request, groupid=0):
    messages = []
    for message in Group.objects.get(pk=groupid).message_set.all():
        messages.append({
            'id': message.id,
            'author': message.user.username,
            'message': message.text,
            'timestamp': message.timestamp
        })
    return Response({
        "group id": groupid,
        "Messages": messages
    })

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [
        IsAuthenticated
    ]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated

    ]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [
        IsAuthenticated,

    ]


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [
        IsAuthenticated,
    ]

class GroupUsersViewSet(viewsets.ModelViewSet):
    queryset = GroupUsers.objects.all()
    serializer_class = GroupUsersSerializer
    permission_classes = [
        IsAuthenticated,
    ]

