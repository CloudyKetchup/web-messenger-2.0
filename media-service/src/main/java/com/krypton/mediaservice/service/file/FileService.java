package com.krypton.mediaservice.service.file;

import com.krypton.common.model.file.FileData;
import com.krypton.mediaservice.config.StorageConfig;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class FileService
{
  public Optional<FileData> saveFilePart(FilePart file)
  {
    return saveFilePart(file, StorageConfig.STORAGE_PATH + "/" + file.filename());
  }

  public Optional<FileData> saveFilePart(FilePart filePart, String path)
  {
    var file = new File(path);
    var folder = file.getParentFile();

    if (!folder.exists()) folder.mkdirs();

    if (!file.exists())
    {
      try
      {
        if (file.createNewFile())
        {
          filePart.transferTo(file).subscribe();

          return Optional.of(new FileData(filePart.filename(), path));
        }
      } catch (IOException e)
      {
        e.printStackTrace();
      }
    }
    return Optional.empty();
  }
}
