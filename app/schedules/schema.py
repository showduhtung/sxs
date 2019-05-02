# schedule schema

import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q
from .models import Schedule
from users.schema import UserType
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User
# from tasks.schema import Task


class ScheduleType(DjangoObjectType):
    class Meta:
        model = Schedule  # from imported .models


class Query(graphene.ObjectType):
    schedule = graphene.List(ScheduleType)

    def resolve_schedule(self, info):
        return Schedule.objects.all()


class CreateSchedule(graphene.Mutation):
    schedule = graphene.Field(ScheduleType)
    # user1 = graphene.Field(UserType)
    # user2 = graphene.Field(UserType)

    class Arguments:
        partner1 = graphene.String()
        partner2 = graphene.String()

    def mutate(self, info, partner1, partner2):
        user1 = get_user_model().objects.get(username=partner1)
        user2 = get_user_model().objects.get(username=partner2)
        schedule = Schedule(partner1=user1, partner2=user2)
        schedule.save()

        return CreateSchedule(schedule=schedule)


class Mutation(graphene.ObjectType):
    create_schedule = CreateSchedule.Field()
