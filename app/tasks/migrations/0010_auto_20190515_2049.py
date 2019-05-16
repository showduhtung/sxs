# Generated by Django 2.2.1 on 2019-05-15 20:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0009_remove_task_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='date',
            name='title',
        ),
        migrations.AddField(
            model_name='date',
            name='day',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
