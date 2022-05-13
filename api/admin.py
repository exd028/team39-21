from django.contrib import admin
from api.models import *
# Register your models here.
admin.site.register(Todo)
admin.site.register(Group)
admin.site.register(Message)
admin.site.register(GroupUsers)

