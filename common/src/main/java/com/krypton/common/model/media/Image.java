package com.krypton.common.model.media;

import com.krypton.common.model.BaseEntity;
import com.krypton.common.model.file.FileData;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@ToString
@Table(name = "image")
public class Image extends BaseEntity
{
    @Column
    private String name;

    @Column(nullable = false)
    private String path;

    public Image() {}

    public Image(String name, String path)
    {
        this.name = name;
        this.path = path;
    }

    public Image(FileData fileData)
    {
        this.name = fileData.getName();
        this.path = fileData.getPath();
    }
}
