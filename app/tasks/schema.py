# task schema
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q, F
from .models import Task, Date
from users.schema import UserType
from schedules.schema import ScheduleType
from schedules.models import Schedule


class TaskType(DjangoObjectType):
    class Meta:
        model = Task  # from imported .models


class DateType(DjangoObjectType):
    class Meta:
        model = Date


class Query(graphene.ObjectType):
    tasks = graphene.List(TaskType)
    dates = graphene.List(DateType)

    def resolve_tasks(self, info):
        return Task.objects.all()

    def resolve_dates(self, info):
        return Date.objects.all()


class CreateTask(graphene.Mutation):
    task = graphene.Field(TaskType)  # ???
    schedule = graphene.Field(ScheduleType)
    date = graphene.Field(DateType)

    class Arguments:
        title = graphene.String()
        schedule_id = graphene.Int()
        description = graphene.String()
        day = graphene.String()

    def mutate(self, info, title, schedule_id, description, day):
        schedule = Schedule.objects.get(id=schedule_id)
        task = Task.objects.create(
            title=title, schedule=schedule, description=description
        )
        date = Date.objects.create(task=task, day=day)
        return CreateTask(task=task, schedule=schedule, date=date)


class IncrementTask(graphene.Mutation):
    task = graphene.Field(TaskType)
    date = graphene.Field(DateType)

    class Arguments:
        task_id = graphene.Int(required=True)
        day = graphene.String(required=True)

    def mutate(self, info, task_id, day):
        task = Task.objects.get(id=task_id)

        date = task.date.get(day=day)
        date.completed = date.completed + 1
        date.save()
        # if task.date != []:
        #     task.date.completed = task.date.completed + 1
        return IncrementTask(task=task, date=date)


class CreateDate(graphene.Mutation):
    date = graphene.Field(DateType)
    task = graphene.Field(TaskType)

    class Arguments:
        task_id = graphene.Int(required=True)
        day = graphene.String()
        days = graphene.String()

    def mutate(self, info, task_id, day, days):
        task = Task.objects.get(id=task_id)
        myList = days.split(',')
        date = Date.objects.bulk_create(
            [Date(task=task, day=n) for n in myList])
        # date = Date.objects.bulk_create(task=task, day=day)
        return CreateDate(task=task, date=date)
        # task = Task.objects.get(id=task_id)


# class DeleteDate(graphene.Mutation):
#     task_id = graphene.Int()
#     # date = graphene.Str()

#     class Arguments:
#         task_id = graphene.Int(required=True)
#         date = graphene.Str(required=True)

#     def mutate(self, info, task_id, date):
#         # user = info.context.user
#         task = Task.objects.get(id=task_id)
#         date = Date.objects.get(day=date, task=task)
#         date.delete()
#         return DeleteTask(task_id=task_id)


# class UpdateTask(graphene.Mutation):
#     task = graphene.Field(TaskType)

#     class Arguments:
#         task_id = graphene.Int(required=True)
#         # title = graphene.String(required = True)

#     def mutate(self, info, task_id):
#         task = Task.objects.get(id=task_id)

#         # task.daysSince = daysSince
#         task.save()
#         return UpdateTask(task=task)


class DeleteTask(graphene.Mutation):
    task_id = graphene.Int()

    class Arguments:
        task_id = graphene.Int(required=True)

    def mutate(self, info, task_id):
        # user = info.context.user
        task = Task.objects.get(id=task_id)
        # if track.posted_by != user:
        #     raise GraphQLError('Not permitted to delete this track')
        task.delete()
        return DeleteTask(task_id=task_id)


class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    # update_task = UpdateTask.Field()
    increment_task = IncrementTask.Field()
    delete_task = DeleteTask.Field()
    create_date = CreateDate.Field()
    # delete_date = DeleteDate.Field()
