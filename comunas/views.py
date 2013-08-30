from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import ComunaForm

def inicio(request):
	ctx = {}
	if request.method == 'POST':
		form = ComunaForm(request.POST)
		if form.is_valid():
			ctx['recieved_name'] = form.cleaned_data['name']
			# return HttpResponseRedirect('/thanks/')
	else:
		form = ComunaForm()

	ctx['form'] = form
	return render(request, 'comunas/inicio.html', ctx)