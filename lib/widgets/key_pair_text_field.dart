import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

import '../styles/colors.dart';

class LocallyKeyPairTextField extends StatefulWidget {
  final String? keyName;
  final String? value;
  final String? helperText;
  final double? width;
  final double? keyFieldWidth;
  final bool? isPassword;
  final EdgeInsetsGeometry? padding;

  const LocallyKeyPairTextField(
      {Key? key,
      this.keyName,
      this.value,
      this.padding,
      this.keyFieldWidth,
      this.helperText,
      this.isPassword,
      this.width})
      : super(key: key);
  @override
  State<LocallyKeyPairTextField> createState() =>
      _LocallyKeyPairTextFieldState();
}

class _LocallyKeyPairTextFieldState extends State<LocallyKeyPairTextField> {
  bool showError = false;
  String? errorText;

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: widget.padding ?? const EdgeInsets.all(0),
        child: SizedBox(
            width: widget.width,
            child: Column(
              children: [
                Container(
                  height: 6,
                  decoration: const BoxDecoration(
                      border: Border(
                          top: BorderSide(
                              color: LocallyLightColors.darkerBorder,
                              width: 1))),
                ),
                Row(
                  children: [
                    SizedBox(
                        width: widget.keyFieldWidth,
                        child: Text(
                          widget.keyName!,
                          style: normalTextStyle(fontWeight: FontWeight.w500),
                        )),
                    const SizedBox(
                      width: 10,
                    ),
                    Expanded(
                        child: Text(
                      widget.isPassword == true ? "********" : widget.value!,
                      style: normalTextStyle(),
                    )),
                  ],
                ),
              ],
            )));
  }
}
