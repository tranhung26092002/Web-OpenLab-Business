package edu.ptit.openlab.service;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageService {
    @Value("${upload-image.path}")
    private String FOLDER_PATH;

    @Value("${upload-video.path}")
    private String folderPath;

    private Path root;

    public String uploadImageToFileSystem(MultipartFile file) {
        byte[] imageData;
        try {
            imageData = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String newFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename(); // Đây là dòng mới
        String filePath = FOLDER_PATH + newFileName; // Sửa dòng này để sử dụng tên tệp mới

        try {
            Files.write(new File(filePath).toPath(), imageData);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return newFileName;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        String filePath = FOLDER_PATH + fileName;
        byte[] imageData = Files.readAllBytes(new File(filePath).toPath());
        return imageData;
    }

    public String saveFile(MultipartFile file) {
        if (!isVideoFileWithTika(file)) {
            System.out.println("Tệp không phải định dạng video");
            return null;
        }
        String newFileName = null;
        try {
            root = Paths.get(folderPath);
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }
            //Để tên tệp là thời gian hiện tại + tên file gốc
            newFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), root.resolve(newFileName), StandardCopyOption.REPLACE_EXISTING);

            return newFileName;
        } catch (Exception e) {
            System.out.println("Lỗi " + e.getLocalizedMessage());
            return null;
        }

    }

    public boolean isVideoFileWithTika(MultipartFile file){
        Tika tika = new Tika();
        try {
            // Xác định loại MIME của tệp
            String detectedType = tika.detect(file.getBytes());

            // Kiểm tra xem loại MIME có bắt đầu với "/"video
            return detectedType.startsWith("video/");
        } catch (IOException e){
            e.printStackTrace();
            return false;
        }
    }

    public Resource loadFile(String fileName) throws Exception {
        try {
            root = Paths.get(folderPath);
            Path pathFile = root.resolve(fileName);
            Resource resource = new UrlResource(pathFile.toUri());
            if(resource.exists()){
                return resource;
            } else {
                throw new Exception("File not found: " + fileName);
            }
        }catch(Exception e){
            System.out.println("Lỗi load file " + e.getLocalizedMessage());
            throw e;
        }
    }

}

