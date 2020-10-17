import com.google.gson.*;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.util.Arrays.stream;

public class ReadAndParse {
    private static String BASE_PATH = "C:\\Users\\lucasm\\Desktop\\enem_panel_using_d3\\data";

    public static void main(String[] args) {
        String[] schoolTypes = {"global", "private", "public"};
        String[] incomeTypes = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"};
        String[] testTypes = {"ch", "cn", "lc", "mt", "writing"};

        List<JsonElement> scoresPerStateAndSchool = stream(testTypes).map(test ->
                stream(schoolTypes)
                        .map(school -> {
                            Path path = Paths.get(String.format("%s\\%s_scores_quantis_%s.json", BASE_PATH, test, school));
                            String content = null;
                            try {
                                content = Files.readString(path);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                            JsonArray jsonArray = JsonParser.parseString(content).getAsJsonArray();
                            jsonArray.forEach(jsonElement -> {
                                JsonObject jsonObject = jsonElement.getAsJsonObject();
                                jsonObject.addProperty("type", "quantis");
                                jsonObject.addProperty("test", test);
                                jsonObject.addProperty("school", school);
                            });

                            return jsonArray;
                        })
                        .flatMap(jsonElements -> StreamSupport.stream(jsonElements.spliterator(), false))
                        .collect(Collectors.toList()))
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        saveToFile(scoresPerStateAndSchool, "scores_per_state.json");

        List<JsonElement> scoresPerStateIncomeAndSchool = stream(testTypes).map(test ->
                stream(schoolTypes)
                        .map(school -> stream(incomeTypes)
                                .map(income -> {
                                    Path path = Paths.get(String.format("%s\\%s_scores_income_%s_%s.json", BASE_PATH, test, income, school));
                                    String content = null;
                                    try {
                                        content = Files.readString(path);
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                    JsonArray jsonArray = JsonParser.parseString(content).getAsJsonArray();
                                    jsonArray.forEach(jsonElement -> {
                                        JsonObject jsonObject = jsonElement.getAsJsonObject();
                                        jsonObject.addProperty("type", "income");
                                        jsonObject.addProperty("test", test);
                                        jsonObject.addProperty("school", school);
                                        jsonObject.addProperty("income", income);
                                    });

                                    return jsonArray;
                                })
                                .flatMap(jsonElements -> StreamSupport.stream(jsonElements.spliterator(), false))
                        )
                        .flatMap(jsonElements -> StreamSupport.stream(jsonElements.spliterator(), false))
                        .collect(Collectors.toList()))
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        saveToFile(scoresPerStateIncomeAndSchool, "scores_per_income_type.json");

    }

    private static void saveToFile(List<JsonElement> jsonElements, String fileName) {
        try (FileWriter writer = new FileWriter(BASE_PATH + "\\" + fileName)) {
            Gson gson = new GsonBuilder().create();
            gson.toJson(jsonElements, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
