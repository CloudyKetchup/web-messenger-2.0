package com.krypton.common.model.media;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krypton.common.model.BaseEntity;
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
    @Column(nullable = false)
    @JsonIgnore
    private String path;

    public Image() {}
}
