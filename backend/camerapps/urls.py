"""camerapps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view  # type: ignore
from drf_yasg import openapi  # type: ignore
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.routers import DefaultRouter
from core.views import AppViewset


# we register the viewset on the router
router = DefaultRouter()
router.register('apps', AppViewset, basename='apps')


urlpatterns = router.urls



# we configure the docs
schema_view = get_schema_view(
    openapi.Info(
        title="Camerapps API",
        default_version="v1",
        description="Camerapps API Reference",
        terms_of_service="https://camerapps.com/terms/",
        contact=openapi.Contact(url="https://camerapps.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=(TokenAuthentication, SessionAuthentication),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/", schema_view.with_ui("swagger", cache_timeout=0), name="docs-ui"),
    path('api/v1/', include(('camerapps.api_urls', 'api'), namespace='api')),
]
