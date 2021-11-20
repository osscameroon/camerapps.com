from rest_framework.routers import DefaultRouter
from core.views import AppViewset


# we register the viewset on the router
router = DefaultRouter()
router.register('apps', AppViewset, basename='apps')


urlpatterns = router.urls
