import graphene
import tasks.schema
import schedules.schema
from users.schema import Query, Mutation
import graphql_jwt


class Query(Query, schedules.schema.Query, tasks.schema.Query, graphene.ObjectType):
    pass


class Mutation(Mutation, schedules.schema.Mutation, tasks.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
