from django.conf.urls import patterns, url

from comunas import views

urlpatterns = patterns('',
	url(r'^$', views.inicio, name='inicio'),
)