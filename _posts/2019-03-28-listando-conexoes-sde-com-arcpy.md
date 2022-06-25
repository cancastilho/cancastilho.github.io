---
layout: post
title:  "Listando conexões sde com arcpy"
date:   2019-03-28 00:00:00 -0300
tags: python add-in arcmap arcpy
permalink: /blog/2019/03/28/listando-conexoes-sde-com-arcpy/
---

Recentemente, precisei programar um add-in para o Arcmap que deveria listar as conexões de banco de dados usando a API do Arcpy criada pela ESRI. Porém, não havia uma função pronta para realizar isso. Elaborei o snippet abaixo para efetuar essa tarefa e estou disponibilizando aqui para futuras referências.

````py
import os
def listSdeConnections():
    appdata = os.getenv(u'APPDATA')
    version = arcpy.GetInstallInfo()[u'Version']
    arcCatalogPath = os.path.join(appdata ,u'ESRI',u'Desktop'+version,u'ArcCatalog')
    # i.e.: C:\Users\username\AppData\Roaming\ESRI\Desktop10.7\ArcCatalog  
    sdeConnections = []
    for file in os.listdir(arcCatalogPath):
        fileIsSdeConnection = file.lower().endswith(u'.sde')
        if fileIsSdeConnection and u'ArcCatalog' in arcCatalogPath:
            dbConnectionPath = u'Database Connections' + arcCatalogPath.split(u'ArcCatalog')[1]
            # i.e.: Database Connections\Production.sde  
            sdeConnections.append(os.path.join(dbConnectionPath, file))
    return sdeConnections

````

Para ver o exemplo funcionando basta abrir o interpretador python do Arcmap, colar esse snippet e executá-lo. O resultado vai depender da sua configuração do arcmap mas será algo do tipo:

````py
>> listSdeConnections()
[
   u'Database Connections\\Homologacao.sde', 
   u'Database Connections\\HomologacaoSDE.sde', 
   u'Database Connections\\Producao.sde', 
   u'Database Connections\\ProducaoSDE.sde'
]
````