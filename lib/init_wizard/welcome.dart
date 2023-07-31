import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/top_bar.dart';

import '../common/constants.dart';
import '../widgets/stages.dart';

StagesChangeNotifier stagesChangeNotifier = StagesChangeNotifier();

class WelcomeWizardHomePage extends StatefulWidget {
  const WelcomeWizardHomePage({super.key});

  @override
  State<WelcomeWizardHomePage> createState() => _WelcomeWizardHomePageState();
}

class _WelcomeWizardHomePageState extends State<WelcomeWizardHomePage> {
  final _initialLoading = false;
  final _loading = false;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Scaffold(
          body: Stack(children: [
        Container(
            height: MediaQuery.of(context).size.height / 2,
            color: LocallyColors.mediumGrey),
        Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const TopBar(
                showIcon: false,
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                        padding: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * .25),
                        child: SizedBox(
                            height: MediaQuery.of(context).size.height / 2 -
                                LocallySizeConstants.topBarHeight,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SvgPicture.asset(
                                  'assets/images/logo.svg',
                                  width: 214,
                                ),
                                Text(
                                  'Local development simplified',
                                  style: h2TextStyle(),
                                ),
                                Padding(
                                  padding:
                                      const EdgeInsets.only(top: 20, bottom: 5),
                                  child: Text(
                                    'github.com/locally',
                                    style: normalTextStyle(
                                        color: LocallyColors.primary),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 20),
                                  child: Text(
                                    '2023.08.01.2112-main',
                                    style: smallTextStyle(),
                                  ),
                                ),
                              ],
                            ))),
                    Padding(
                        padding: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * .25),
                        child: Column(children: [
                          Padding(
                              padding: const EdgeInsets.only(top: 50),
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.pushNamed(context, '/wizard/name');
                                },
                                child: const Text('Create New Environment'),
                              )),
                          Padding(
                              padding: const EdgeInsets.only(top: 20),
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
