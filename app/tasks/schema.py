# task schema
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q, F
from .models import Task
from users.schema import UserType
from schedules.schema import ScheduleType
from schedules.models import Schedule


print("and this is what task looks like", Task)


class TaskType(DjangoObjectType):
    class Meta:
        model = Task  # from imported .models


class Query(graphene.ObjectType):
    tasks = graphene.List(TaskType)

    def resolve_tasks(self, info):
        return Task.objects.all()


class CreateTask(graphene.Mutation):
    task = graphene.Field(TaskType)  # ???
    schedule = graphene.Field(ScheduleType)

    class Arguments:
        title = graphene.String()
        schedule_id = graphene.Int()
        description = graphene.String()

    def mutate(self, info, title, schedule_id, description):
        schedule = Schedule.objects.get(id=schedule_id)
        task = Task.objects.create(
            title=title, schedule=schedule, description=description
        )
        # task = Task(title=title, schedule=schedule, description=description)
        # task.save()
        return CreateTask(task=task, schedule=schedule)  # arguments = track


class UpdateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        task_id = graphene.Int(required=True)

    def mutate(self, info, task_id):
        # task = Task.objects.get(id=task_id).update(
            # completed=F('completed') + 1)
        task = Task.objects.get(id=task_id)
        # task.update(completed=F('completed') + 1)
        # print(task.completed)
        # print(type(task.completed))
        # print(type(F('completed')))
        task.completed = task.completed + 1
        task.save()
        return UpdateTask(task=task)


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
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()
