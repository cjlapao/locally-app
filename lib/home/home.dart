import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/top_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _initialLoading = false;
  final _loading = false;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Scaffold(
          body: Column(
        children: [
          TopBar(
            showLogo: true,
          ),
          Row(
            children: [
              Column(
                children: [Text("test")],
              ),
              Container(
                width: 6,
                color: LocallyLightColors.darkerBackground,
              ),
              Expanded(
                  child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Image.asset('assets/images/logo.png'),
                    Text(
                      'Local development simplified',
                      style: h2TextStyle(),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Text(
                        'github.com/locally',
                        style:
                            normalTextStyle(color: LocallyLightColors.primary),
                      ),
                    ),
                    Padding(
                        padding: const EdgeInsets.only(top: 60),
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.pushNamedAndRemoveUntil(
                                context, '/wizard/name', (route) => false);
                          },
                          child: const Text('Create Environment'),
                        )),
                  ],
                ),
              )), // This trailing comma makes auto-formatting nicer for build methods.
            ],
          )
        ],
      ));
    }, future: () async {
      return true;
    }());
  }
}
