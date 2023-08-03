import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

import 'colors.dart';

TextButtonThemeData textButtonTheme() {
  return TextButtonThemeData(
      style: ButtonStyle(
          surfaceTintColor:
              MaterialStateProperty.all<Color>(LocallyLightColors.errorText),
          elevation: MaterialStateProperty.all<double>(0),
          overlayColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyLightColors.textButtonDisabled;
            }
            if (states.contains(MaterialState.hovered)) {
              return LocallyLightColors.textButtonHover;
            }
            if (states.contains(MaterialState.pressed)) {
              return LocallyLightColors.textButtonPressed;
            }
            if (states.contains(MaterialState.focused)) {
              return LocallyLightColors.textButtonFocused;
            }
            return LocallyLightColors.textButton;
          }),
          foregroundColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyLightColors
                  .textButtonDisabledText; // Disabled color
            }
            return LocallyLightColors.textButtonText;
          }),
          textStyle: MaterialStateProperty.resolveWith<TextStyle>((states) {
            if (states.contains(MaterialState.disabled)) {
              return textButtonTextStyle(
                  color: LocallyLightColors.textButtonDisabledText);
            }
            return textButtonTextStyle();
          }),
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              const EdgeInsets.symmetric(vertical: 15, horizontal: 15)),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            ),
          )));
}
