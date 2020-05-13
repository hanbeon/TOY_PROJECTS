package crawlingUtils.utils;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ZipUtils {

    /**
     * @DATE 2020. 1. 21.
     * @DESC UnZip
     * @param target
     */
    public static void unZip(String target) {

        ZipEntry zipEntry = null;

        try( FileInputStream fileInputStream = new FileInputStream(target);
             ZipInputStream zipInputStream = new ZipInputStream(fileInputStream);)
        {
            FileOutputStream fileOutputStream = null;

            while ( (zipEntry = zipInputStream.getNextEntry()) != null ) {
                fileOutputStream = new FileOutputStream(zipEntry.getName());
                int length = 0;
                byte[] buf = new byte[1024];
                long processLength=0;

                while ( (length = zipInputStream.read(buf)) != -1 ) {
                    fileOutputStream.write(buf, 0, length);
                    processLength += length;
                    String progress = String.format("%.2f", (double)processLength/(double)zipEntry.getSize()*100.0);

                    if ( Double.parseDouble(progress) % 1 == 0 ) {
                        System.out.println("[ PROGRESS :: UN ZIP ]  "+progress +"%");
                    }
                }
                fileOutputStream.flush();
            }
            fileOutputStream.close();
        }
        catch(IOException e){
            e.printStackTrace();
        }

    }

}
