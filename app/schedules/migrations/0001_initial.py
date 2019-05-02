# Generated by Django 2.2.1 on 2019-05-01 20:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partner1', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='partner1', to=settings.AUTH_USER_MODEL)),
                ('partner2', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='partner2', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
