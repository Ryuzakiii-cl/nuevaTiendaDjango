from django import forms
from django.contrib.auth.forms import UserCreationForm
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit

class MyForm(forms.Form):
    # Campos de tu formulario

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            # Definición de la estructura de tu formulario
            Submit('submit', 'Enviar')
        )

class CustomUserCreationForm(UserCreationForm):
    pass