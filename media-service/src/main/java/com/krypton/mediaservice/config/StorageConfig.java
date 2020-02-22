package com.krypton.mediaservice.config;

public class StorageConfig
{
  private final static String HOME_DIR = System.getProperty("user.home");
  public static final String STORAGE_PATH = HOME_DIR + "/dev/web-messenger/storage";
  public static final String IMAGES_PATH = STORAGE_PATH + "/images";
  public static final Integer PROFILE_IMAGE_HEIGHT = 500;
  public static final Integer PROFILE_IMAGE_WIDTH = 500;
}
