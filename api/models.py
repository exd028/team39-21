from django.db import models
from django.conf import settings
# Create your models here.


class Todo(models.Model):
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    title = models.CharField('title', max_length=30)
    description = models.CharField('description', max_length=200)
    completed = models.BooleanField('completed', default=False)

    def __str__(self):
        return "{}: completed = {}".format(self.title, str(self.completed))


class Group(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return "Title: {} (ID = {}), desc = {}".format(self.name, str(self.id), self.description)


class GroupUsers(models.Model):
    class Meta:
        unique_together = (('group', 'user'))

    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return "User {} is in Group: {}".format(self.user.username, self.group.name)


class Message(models.Model):
    # groupuser = models.OneToOneField(
    #     'GroupUsers', on_delete=models.CASCADE, unique=True)
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
    timestamp = models.TimeField(auto_now_add=True)

    def __str__(self):
        return "{} : {}".format(self.user.username, self.text)
