# Cadastro de carro:

**RF**
- Deve ser possível cadastrar um novo carro.

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado por padrão com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carro:

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pela categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.


# Cadastro de Especificação do carro:

**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- Não deve ser psosível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagem do carro:

**RF**
- Deve ser possível cadastro a imagem do carro.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro:

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- Não deve ser psosível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de um carro:
**RF**
Deve ser possível realizar a deovlução de um carro.

**RN**
- O usuário deve estar logado na aplicação.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Se o carro for devolvido com menos de 24 horas, deve ser cobrado a diária completa.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.


# Listagem de aluguéis para usuário:
**RF**
- Deve ser possível realizar a busca de todos os aluguéis para o usuário.

**RNF**
- O usuário deve estar logado na aplicação.


# Recuperação de senha
**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**
- O usuário precisa informar uma nova senha.
- O link enviado para recuperação deve expirar em 3 horas.


**RF**

**RNF**

**RN**