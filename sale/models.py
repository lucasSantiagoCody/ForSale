from django.db import models


class Sale(models.Model):
    pass
    

class Category(models.Model):
    nome = models.CharField(max_length=30)
    descricao = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.nome

class Product(models.Model):
    product_name = models.CharField(max_length=50)
    product_status = models.CharField(max_length=8)
    product_image = models.FileField()
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)


