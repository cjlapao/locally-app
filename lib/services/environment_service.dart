import 'package:http/http.dart';
import 'dart:convert';
import 'package:locally/common/constants.dart';

class EnvironmentService {
  var baseUrl = Uri.http(LocallyConstants.baseUrl, '/api/environment');

  Future<bool> isInitialized() async {
    try {
      var url =
          Uri.http(LocallyConstants.baseUrl, '/api/environment/initialized');
      var response = await get(url);
      if (response.statusCode >= 200 && response.statusCode <= 299) {
        dynamic body = jsonDecode(response.body);
        return body as bool;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
