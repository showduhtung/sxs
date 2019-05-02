# task model
from django.db import models
from django.contrib.auth import get_user_model
from schedules.models import Schedule

# Create your models here.


class Task(models.Model):
    # an id field is added automatically as trackId
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    # url = models.URLField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.IntegerField(default=0)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)

    # partners = models.ManyToManyField(get_user_model())
    # class Meta:

    # posted_by = models.ForeignKey(
    # get_user_model(), null=True, on_delete=models.CASCADE)


# print("\n Tasks", Task.objects.all())
# print("\n get_user_model()", get_user_model(), "\n")
