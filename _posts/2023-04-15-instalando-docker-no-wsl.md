---
layout: post
title: "Instalando o docker no WSL"
tags: wsl docker linux windows windows-subsystem-for-linux
---

Depois de se acostumar a desenvolver sistemas web usando docker fica difícil voltar atrás. No linux, é fácil fazer a instalação do docker e tem muito material online que mostra como fazê-lo. Este artigo, porém, mostra como instalar o docker no Windows usando o Windows Subsystem for Linux (WSL). O procedimento abaixo foi testado em Windows 10 e Windows 11 e funcionou em ambos. Caso prefira ver em vídeo, deixei publicado o passo-a-passo no Youtube:

<iframe  width="100%" height="500" src="https://www.youtube.com/embed/Fs-xQKDq504" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Antes de executar o procedimento abaixo você deve ativar o Windows Subsystem For Linux no Windows e instalar o Ubuntu. Veja [esta documentação da Microsoft](https://learn.microsoft.com/pt-br/windows/wsl/install-manual) que mostra como fazer isso. Recomendo também que instale o Windows Terminal, a partir da Microsoft Store, para ter um terminal decente para abrir o Ubuntu. 

Uma informação importante é que o WSL e o Virtual box não podem ser executados simultaneamente, então se ativar o WSL, após o reinício da máquina, suas máquinas virtuais do VirtualBox não irão mais funcionar até que você desative o WSL e reative a opção de "Plataforma de Máquina Virtual" na seção de "Adicionar e Remover Programas > Ativar ou desativar recursos do Windows". Isso não está claro na documentação da Microsoft, mas a experiência me mostrou que você não pode ter tudo o que quer.

Tendo esses pré-requisitos instalados, abra o Ubuntu no Windows Terminal e execute o procedimento abaixo, que mostra como instalar o docker no WSL e como executar uma imagem do apache nele para desenvolvimento web:

````sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# verifique que o usuário corrente não está no grupo do docker
id

# Adicione o usuário no grupo o docker:
# [Editado 22/04/2023]
sudo usermod -aG docker $USER

# feche e abra o terminal e verifique se o usuário está no grupo do docker
id

vi ~/.profile

# inclua isso no final do arquivo .profile:
# Configuração para funcionar docker no wsl
if grep -q "microsoft" /proc/version > /dev/null 2>&1; then
   if service docker status 2>&1 | grep -q "is not running"; then
      wsl.exe --distribution "${WSL_DISTRO_NAME}" --user root \
	--exec /usr/sbin/service docker start > /dev/null 2>&1
   fi
fi

# feche o terminal e abra-o novamente após editar o .profile.

# Confira a versão do docker instalada
docker version
# Confira a versão do docker compose instalada
docker compose version

# Inicia o apache webserver mapeando o diretório corrente do Ubuntu para o /var/www/html no container.
# Mude para o seu diretório de código fonte e execute esse comando para facilitar o desenvolvimento web.
docker run -dp 80:80 --mount type=bind,src="$(pwd)",target=/var/www/html php:8.1-apache

# Caso esteja tendo o erro "error getting credentials - err: docker-credential-desktop.exe resolves 
# to executable in current directory", tente executar o docker como root. Isso quer dizer que você 
# não inclui o usuário no grupo do docker como informado mais acima.

# crie um index.hml no diretório corrente, mapeado para o docker, 
# para testar o acesso HTTP
echo "teste" > index.html

# para acessar o webserver rodando no docker do WSL a partir do windows, máquina host,
# use um dos seguintes endereços no seu navegador http://localhost/ ou http://127.0.0.1/

# para acessar a partir de outros computadores da rede é necessário criar uma regra de entrada
# no firewall  do windows para liberar a porta 80. 
# Execute o comando abaixo como administrador no powershell:
netsh advfirewall firewall add rule name="WSL HTTP porta 80" dir=in action=allow protocol=TCP localport=80

# além disso é necessário fazer um proxy executando o comando abaixo no powershell como administrador:
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=127.0.0.1

# isso fará com que conexões na porta 80 vindas de qualquer endereço de IP (0.0.0.0) sejam encaminhadas 
# para a porta 80 do IP 127.0.0.1, que é onde está rodando o apache do WSL.

# [Editado 22/04/2023]
# Estranhamente, após alguns testes o portproxy parou de funcionar usando o ip 127.0.0.1. 
# Verifiquei que foi necessário usar o IP do Ubuntu instalado no WSL ao invés do ip 127.0.0.1, 
# para que voltasse a funcionar o acesso a partir de outras máquinas.
# Se esse for seu caso, faça o seguinte:
# Obtenha o ip do seu linux instalado no WSL com o comando abaixo:
ip a | grep inet | grep eth0
# no meu caso retornou 
# inet 172.28.144.14/20 brd 172.28.159.255 scope global eth0

# Execute o powershell do windows como administrador e execute novamente o comando abaixo 
# com o ip do linux no connectaddress
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=172.28.144.14 # substitua 172.28.144.14 pelo IP do seu linux.
# Feito! Agora é possível acessar seu servidor web na porta 80 a partir de outras máquinas da rede.
````

Mais detalhes de como instalar o docker no WSL podem ser encontrados nas referências abaixo:

- [Install Docker in WSL 2 without Docker Desktop](https://www.youtube.com/watch?v=SDk3pqFXgs8)
- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)