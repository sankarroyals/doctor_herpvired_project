from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path,include




# add +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)    for storing images in media/images

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('doctorPatientApp.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
