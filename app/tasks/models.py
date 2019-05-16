# task model
from django.db import models
from django.contrib.auth import get_user_model
from schedules.models import Schedule
import datetime
print(datetime)

# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created_at = models.DateField(auto_now_add=True)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)


class Date(models.Model):
    day = models.DateField(default=datetime.date.today, auto_now_add=False)
    completed = models.IntegerField(default=0)
    task = models.ForeignKey(
        'tasks.Task', related_name='date', on_delete=models.CASCADE)
