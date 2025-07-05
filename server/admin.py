from django.contrib import admin
from server.models import Server, ServerCategory

@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if not obj.user_id:  # Если пользователь не указан
            obj.user = request.user  # Устанавливаем текущего пользователя
        super().save_model(request, obj, form, change)

@admin.register(ServerCategory)
class ServerCategoryAdmin(admin.ModelAdmin):
    pass  # Базовая регистрация без настроек