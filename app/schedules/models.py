# schedule model
from django.db import models
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User
# from tasks.models import Task

# # Create your models here.


class Schedule(models.Model):
    partner1 = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="partner1", default="")
    partner2 = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="partner2", default="")
    # listOfTasks = models.ManyToManyField(Task, related_name="tasks")


# print(get_user_model().objects.all())
