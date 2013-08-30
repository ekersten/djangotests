from django import forms

class ComunaForm(forms.Form):
	name = forms.CharField(label='Nombre')
	habitants = forms.IntegerField(label='Habitantes')