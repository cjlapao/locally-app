import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

import 'colors.dart';

ElevatedButtonThemeData elevatedButtonTheme() {
  return ElevatedButtonThemeData(
      style: ButtonStyle(
          surfaceTintColor:
              MaterialStateProperty.all<Color>(LocallyLightColors.white),
          backgroundColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyLightColors.primaryButtonDisabled;
            }
            if (states.contains(MaterialState.hovered)) {
              return LocallyLightColors.primaryButtonHover;
            }
            if (states.contains(MaterialState.pressed)) {
              return LocallyLightColors.primaryButtonPressed;
            }
            if (states.contains(MaterialState.focused)) {
              return LocallyLightColors.primaryButtonFocused;
            }

            return LocallyLightColors.primaryButton;
          }),
          textStyle: MaterialStateProperty.resolveWith<TextStyle>((states) {
            if (states.contains(MaterialState.disabled)) {
              return primaryButtonTextStyle(
                  color: LocallyLightColors.primaryButtonDisabledText);
            }
            return primaryButtonTextStyle();
          }),
          elevation: MaterialStateProperty.all<double>(0),
          foregroundColor:
              MaterialStateProperty.all<Color>(LocallyLightColors.white),
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              const EdgeInsets.symmetric(vertical: 15, horizontal: 15)),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            ),
          )));
}
