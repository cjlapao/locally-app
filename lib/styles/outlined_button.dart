import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

import 'colors.dart';

OutlinedButtonThemeData outlinedButtonTheme() {
  return OutlinedButtonThemeData(
      style: ButtonStyle(
          overlayColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyLightColors.secondaryButtonDisabled;
            }
            if (states.contains(MaterialState.hovered)) {
              return LocallyLightColors.secondaryButtonHover;
            }
            if (states.contains(MaterialState.pressed)) {
              return LocallyLightColors.secondaryButtonPressed;
            }
            if (states.contains(MaterialState.focused)) {
              return LocallyLightColors.secondaryButtonFocused;
            }
            return LocallyLightColors.secondaryButton;
          }),
          splashFactory: InkRipple.splashFactory,
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              const EdgeInsets.symmetric(vertical: 15, horizontal: 15)),
          side: MaterialStateProperty.resolveWith<BorderSide>((states) {
            if (states.contains(MaterialState.disabled)) {
              return const BorderSide(
                  color: LocallyLightColors
                      .secondaryButtonDisabledBorder); // Disabled color
            }
            return const BorderSide(
                color: LocallyLightColors.secondaryButtonBorder);
          }),
          textStyle: MaterialStateProperty.resolveWith<TextStyle>((states) {
            if (states.contains(MaterialState.disabled)) {
              return secondaryButtonTextStyle(
                  color: LocallyLightColors.secondaryButtonDisabledText);
            }
            return secondaryButtonTextStyle();
          }),
          foregroundColor: MaterialStateProperty.resolveWith((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyLightColors.secondaryButtonDisabledText;
            }
            return LocallyLightColors.secondaryButtonText;
          }),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            ),
          )));
}
