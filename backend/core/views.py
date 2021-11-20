from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from core.serializers import AppWriteSerializer, AppSerializer
from core.models import App
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class AppViewset(CreateModelMixin, ListModelMixin, GenericViewSet):

    serializer_class = AppSerializer
    queryset = App.objects.all()

    @swagger_auto_schema(request_body=AppWriteSerializer(),
        responses={
            200: AppSerializer
        })
    def create(self, request, *args, **kwargs):
        serializer = AppWriteSerializer(data=self.request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(AppSerializer(instance).data, status=201)

        return Response(serializer.errors, status=400)
