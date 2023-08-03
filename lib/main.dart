import 'package:flutter/material.dart';
import 'package:locally/home/home.dart';
import 'package:locally/init_wizard/stage.dart';
import 'package:locally/services/environment_service.dart';
import 'package:locally/styles/colors.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:locally/styles/elevated_button.dart';
import 'package:locally/styles/input_field.dart';
import 'package:locally/styles/outlined_button.dart';
import 'package:locally/styles/text_button.dart';
import 'init_wizard/welcome.dart';

void main() async {
  final EnvironmentService envSvc = EnvironmentService();
  final bool isInitialized = await envSvc.isInitialized();
  final String initialRoute = isInitialized ? '/' : '/wizard/welcome';

  runApp(LocallyApp(initialRoute: initialRoute));
  doWhenWindowReady(() {
    appWindow.minSize = const Size(600, 450);
    appWindow.size = const Size(1450, 850);
    appWindow.alignment = Alignment.center;
    appWindow.title = "Locally";
    appWindow.show();
  });
}

class LocallyApp extends StatelessWidget {
  final String initialRoute;

  const LocallyApp({super.key, required this.initialRoute});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Locally',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(seedColor: LocallyLightColors.primary),
        buttonTheme: const ButtonThemeData(
          buttonColor: LocallyLightColors.primary,
          textTheme: ButtonTextTheme.primary,
        ),
        elevatedButtonTheme: elevatedButtonTheme(),
        outlinedButtonTheme: outlinedButtonTheme(),
        textButtonTheme: textButtonTheme(),
        inputDecorationTheme: inputTheme(),
        useMaterial3: true,
      ),
      initialRoute: initialRoute,
      onGenerateRoute: (settings) {
        Uri? uri = Uri.tryParse(settings.name!);
        if (uri == null) {
          return null;
        }
        switch (uri.path) {
          case '/':
            return MaterialPageRoute(
              builder: (context) => const HomePage(),
              settings: settings,
            );
          case '/wizard/welcome':
            return MaterialPageRoute(
              builder: (context) => const WelcomeWizardHomePage(),
              settings: settings,
            );
          case '/wizard/name':
            return MaterialPageRoute(
              builder: (context) => const WelcomeWizardStagePage(),
              settings: settings,
            );
          default:
            return MaterialPageRoute(builder: (context) => const HomePage());
        }
      },
    );
  }
}
