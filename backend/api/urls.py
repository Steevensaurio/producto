from api import views as api_views
from .views import SolicitudTutoriaView, TutoriaListView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("user/token/", api_views.MyTokenObtainPairView.as_view()),
    path("user/token/refresh/", TokenRefreshView.as_view()),
    path("user/register/", api_views.RegisterView.as_view()),
    path("user/solicitud/", SolicitudTutoriaView.as_view()),
    path("tutorias/", TutoriaListView.as_view(), name="tutorias-list"),
]
