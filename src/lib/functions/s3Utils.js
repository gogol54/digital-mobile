import { Buffer } from 'buffer'
import { v4 as uuidv4 } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3 from '../../../s3.config'
import * as FileSystem from 'expo-file-system'

export const uploadFileToS3 = async (file) => {
  try {
    // Gerar nome único para o arquivo usando UUID
    const fileName = `${uuidv4()}-${file.uri.split('/').pop()}`; // Usando UUID para gerar o nome do arquivo

    // Carregar o arquivo como um buffer binário
    const fileBuffer = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Configurar os parâmetros para o S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `files/avatar/mobile/${fileName}`,
      Body: Buffer.from(fileBuffer, 'base64'),  // Converter a string base64 para Buffer
      ContentType: file.type || 'image/jpeg',  // Definir o tipo de conteúdo (verificar se é imagem ou vídeo)
      ACL: 'public-read', // Permitir leitura pública do arquivo
    };

    // Enviar o comando ao S3
    const command = new PutObjectCommand(params);
    const uploadResult = await s3.send(command);

    // Gerar a URL pública do arquivo
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/files/avatar/mobile/${fileName}`;

    console.log('Upload bem-sucedido:', fileUrl);
    return fileUrl; // Retorna a URL para ser usada no app
  } catch (error) {
    console.error('Erro ao fazer upload para o S3:', error);
    throw error; // Repassa o erro para o chamador tratar
  }
};
