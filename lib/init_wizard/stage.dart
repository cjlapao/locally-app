import 'package:flutter/material.dart';
import 'package:locally/init_wizard/stages/name_stage.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/widgets/stages.dart';
import 'package:locally/widgets/top_bar.dart';

import '../widgets/modal_window.dart';

const stages = [
  "Name",
  "Location",
  "Domains",
  "Review",
];

class WelcomeWizardStagePage extends StatefulWidget {
  const WelcomeWizardStagePage({super.key});

  @override
  State<WelcomeWizardStagePage> createState() => _WelcomeWizardStagePageState();
}

class _WelcomeWizardStagePageState extends State<WelcomeWizardStagePage> {
  final _loading = false;
  final double modalWidth = 1030;
  final double modalHeight = 650;

  @override
  void initState() {
    super.initState();
    stagesChangeNotifier.stage = stages[0];
    stagesChangeNotifier.addListener(() {
      if (mounted) {
        setState(() {});
      }
    });
  }

  int getStageIndex(String stage) {
    return stages.indexOf(stage);
  }

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
                  child: Center(
                      child: SizedBox(
                          width: modalWidth,
                          height: modalHeight,
                          child: ModalWindow(
                              isLoading: _loading,
                              title: "Create new environment",
                              subtitle:
                                  "Flow the steps to create new environment",
                              child: Row(children: [
                                Stages(
                                  width: modalHeight * .30,
                                  currentStage:
                                      stagesChangeNotifier.currentStage,
                                  stagesChangeNotifier: stagesChangeNotifier,
                                  stages: stages,
                                ),
                                Expanded(
                                    child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                      if (stagesChangeNotifier.currentStage ==
                                          stages[0])
                                        const WelcomeWizardStageNamePage(),
                                      Padding(
                                          padding: const EdgeInsets.only(
                                              top: 20,
                                              left: 10,
                                              right: 10,
                                              bottom: 20),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          right: 10),
                                                  child: ElevatedButton(
                                                      style: const ButtonStyle(
                                                          fixedSize:
                                                              MaterialStatePropertyAll(
                                                                  Size(105,
                                                                      38))),
                                                      onPressed: stagesChangeNotifier
                                                                  .currentStage !=
                                                              stages[stages
                                                                      .length -
                                                                  1]
                                                          ? () {
                                                              setState(() {
                                                                stagesChangeNotifier
                                                                        .stage =
                                                                    stages[getStageIndex(
                                                                            stagesChangeNotifier.currentStage) +
                                                                        1];
                                                              });
                                                            }
                                                          : null,
                                                      child:
                                                          const Text("Next"))),
                                              Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          right: 10),
                                                  child: OutlinedButton(
                                                      style: const ButtonStyle(
                                                          fixedSize:
                                                              MaterialStatePropertyAll(
                                                                  Size(105,
                                                                      38))),
                                                      onPressed:
                                                          stagesChangeNotifier
                                                                      .currentStage !=
                                                                  stages[0]
                                                              ? () {
                                                                  setState(() {
                                                                    stagesChangeNotifier
                                                                            .stage =
                                                                        stages[getStageIndex(stagesChangeNotifier.currentStage) -
                                                                            1];
                                                                  });
                                                                }
                                                              : null,
                                                      child:
                                                          const Text("Back"))),
                                              Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          right: 10),
                                                  child: TextButton(
                                                      style: const ButtonStyle(
                                                          fixedSize:
                                                              MaterialStatePropertyAll(
                                                                  Size(105,
                                                                      38))),
                                                      onPressed: () {
                                                        Navigator
                                                            .pushNamedAndRemoveUntil(
                                                                context,
                                                                "/",
                                                                (route) =>
                                                                    false);
                                                      },
                                                      child:
                                                          const Text("Cancel")))
                                            ],
                                          ))
                                    ]))
                              ])))))
            ])
      ]));
    }, future: () async {
      return true;
    }());
  }
}
