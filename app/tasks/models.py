# task model
from django.db import models
from django.contrib.auth import get_user_model
from schedules.models import Schedule

# Create your models here.


class Task(models.Model):
    # an id field is added automatically as trackId
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created_at = models.DateField(auto_now_add=True)
    completed = models.IntegerField(default=0)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    daysSince = models.IntegerField(default=0)


# look at how many days since today was the first task created, and confirm that there are that many tasks since ()
# 1) confirm the right amount of tasks
#       example- created 4 days ago, 4 tasks
# 2) make sure it corresponds to the right schedule (schedule = which day)
#
