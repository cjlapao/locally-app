import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:locally/models/environment.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/top_bar.dart';

import '../common/constants.dart';
import '../widgets/stages.dart';

StagesChangeNotifier<EnvironmentRequest> stagesChangeNotifier =
    StagesChangeNotifier();

class WelcomeWizardHomePage extends StatefulWidget {
  const WelcomeWizardHomePage({super.key});

  @override
  State<WelcomeWizardHomePage> createState() => _WelcomeWizardHomePageState();
}

class _WelcomeWizardHomePageState extends State<WelcomeWizardHomePage> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Scaffold(
          body: Stack(children: [
        Container(
            height: MediaQuery.of(context).size.height / 2,
            color: LocallyLightColors.darkerBackground),
        Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const TopBar(
                showLogo: false,
                color: LocallyLightColors.darkerBackground,
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                        padding: const EdgeInsets.only(left: 303),
                        child: SizedBox(
                            height: MediaQuery.of(context).size.height / 2 -
                                LocallySizeConstants.topBarHeight,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                    padding:
                                        const EdgeInsets.only(bottom: 15.5),
                                    child: SvgPicture.asset(
                                      'assets/images/logo.svg',
                                      width: 214,
                                    )),
                                Padding(
                                    padding: const EdgeInsets.only(bottom: 30),
                                    child: Text(
                                      'Local development simplified',
                                      style: h2TextStyle(),
                                    )),
                                Padding(
                                  padding:
                                      const EdgeInsets.only(top: 20, bottom: 6),
                                  child: Text(
                                    'github.com/locally',
                                    style: normalTextStyle(
                                        color: LocallyLightColors.primary),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 31),
                                  child: Text(
                                    '2023.08.01.2112-main',
                                    style: smallTextStyle(),
                                  ),
                                ),
                              ],
                            ))),
                    Padding(
                        padding: const EdgeInsets.only(left: 303),
                        child: Column(children: [
                          Padding(
                              padding: const EdgeInsets.only(top: 38),
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.pushNamed(context, '/wizard/name');
                                },
                                child: const Text('Create New Environment'),
                              )),
                          Padding(
                              padding: const EdgeInsets.only(top: 17),
                              child: OutlinedButton(
                                  onPressed: () {
                                    Navigator.pushNamedAndRemoveUntil(
                                        context, "/", (route) => false);
                                  },
                                  child:
                                      const Text('Add Existing Environment')))
                        ])),
                  ],
                ),
              ), // This trailing comma makes auto-formatting nicer for build methods.))
            ])
      ]));
    }, future: () async {
      return true;
    }());
  }
}
